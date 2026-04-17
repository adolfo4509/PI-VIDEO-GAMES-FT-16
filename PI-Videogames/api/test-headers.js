#!/usr/bin/env node

/**
 * Script para probar la configuración de headers HTTP
 * Verifica que todos los headers de seguridad estén presentes
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

const HEADERS_ESPERADOS = {
    // Headers de seguridad
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-xss-protection': '1; mode=block',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    'cross-origin-embedder-policy': 'require-corp',
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-resource-policy': 'same-origin',

    // Headers de API
    'x-api-version': '1.0.0',
    'x-timestamp': (value) => value && !isNaN(Date.parse(value)), // Debe ser timestamp válido

    // Headers de rate limiting
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': (value) => value && parseInt(value) >= 0,
    'x-ratelimit-reset': (value) => value && !isNaN(Date.parse(value)),

    // Headers de caché
    'cache-control': (value) => value && (value.includes('max-age=300') || value.includes('no-cache')),
};

async function testHeaders() {
    console.log('🧪 Probando configuración de headers HTTP...\n');

    try {
        // Test 1: Request GET normal
        console.log('📤 Test 1: Request GET a /videogames/videogames');
        const response = await axios.get(`${API_BASE_URL}/videogames/videogames`, {
            headers: {
                'Origin': 'http://localhost:3000',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        console.log(`✅ Status: ${response.status}`);
        console.log('📋 Headers recibidos:');

        const headers = response.headers;
        let passedTests = 0;
        let totalTests = 0;

        Object.entries(HEADERS_ESPERADOS).forEach(([header, expectedValue]) => {
            totalTests++;
            const actualValue = headers[header.toLowerCase()];

            if (!actualValue) {
                console.log(`❌ ${header}: NO PRESENTE`);
                return;
            }

            if (typeof expectedValue === 'function') {
                if (expectedValue(actualValue)) {
                    console.log(`✅ ${header}: ${actualValue}`);
                    passedTests++;
                } else {
                    console.log(`❌ ${header}: ${actualValue} (valor inválido)`);
                }
            } else if (actualValue === expectedValue) {
                console.log(`✅ ${header}: ${actualValue}`);
                passedTests++;
            } else {
                console.log(`❌ ${header}: ${actualValue} (esperado: ${expectedValue})`);
            }
        });

        // Test 2: Verificar CORS
        console.log('\n🌐 Test 2: Verificando CORS');
        const corsHeaders = [
            'access-control-allow-origin',
            'access-control-allow-credentials',
            'access-control-allow-methods',
            'access-control-allow-headers'
        ];

        corsHeaders.forEach(header => {
            totalTests++;
            if (headers[header]) {
                console.log(`✅ ${header}: ${headers[header]}`);
                passedTests++;
            } else {
                console.log(`❌ ${header}: NO PRESENTE`);
            }
        });

        // Test 3: Verificar que headers sensibles NO estén presentes
        console.log('\n🔒 Test 3: Verificando headers sensibles ocultos');
        const sensitiveHeaders = ['x-powered-by', 'server'];

        sensitiveHeaders.forEach(header => {
            totalTests++;
            if (!headers[header.toLowerCase()]) {
                console.log(`✅ ${header}: CORRECTAMENTE OCULTO`);
                passedTests++;
            } else {
                console.log(`❌ ${header}: ${headers[header]} (DEBE ESTAR OCULTO)`);
            }
        });

        // Resultado final
        console.log(`\n📊 Resultado: ${passedTests}/${totalTests} tests pasaron`);

        if (passedTests === totalTests) {
            console.log('🎉 ¡Todos los headers están configurados correctamente!');
        } else {
            console.log('⚠️  Algunos headers necesitan revisión.');
        }

    } catch (error) {
        console.error('❌ Error en la prueba:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Headers:', error.response.headers);
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    testHeaders();
}

module.exports = { testHeaders };
const AudioPlayer = require('jsmusic');
const readline = require('readline');

// Crear una interfaz de readline para interactuar con la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para preguntar al usuario el archivo que desea reproducir
function askForMusic() {
    rl.question('¿Qué archivo de música te gustaría reproducir? (Ingresa la ruta del archivo): ', (filePath) => {
        const player = new AudioPlayer(filePath);
        player.play();

        console.log('Reproduciendo música. Presiona Ctrl+C para detener.');
        
        // Opcional: Implementar comandos para pausar, reanudar o detener.
        rl.on('line', (input) => {
            switch(input.trim()) {
                case 'pausa':
                    player.pause();
                    console.log('Música pausada. Escribe "reanudar" para continuar.');
                    break;
                case 'reanudar':
                    player.resume();
                    console.log('Reanudando música.');
                    break;
                case 'detener':
                    player.stop();
                    console.log('Música detenida.');
                    rl.close();
                    break;
                default:
                    console.log('Comando no reconocido.');
            }
        });
    });
}

askForMusic();

// Manejar cierre
rl.on('close', () => {
    console.log('Adiós!');
    process.exit(0);
});

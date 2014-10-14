$(document).on('ready', function() {

	inicia();

});


// Variables globales
var grande = 15;
var repintar = [];
var genX = [];
var repetir = 40;


function inicia() {
	
	//	Iniciamos las celdas en cero
	for (y = 0; y < grande; y++) {
		
		repintar[y] = new Array();
		genX[y] = new Array();

		for (x = 0; x < grande; x++) {
			repintar[y][x] = 0;
			genX[y][x] = 0;
		}
	}


	//	Asignamos unas celdas vivas
	for (i = 0; i < 40; i++) {
		var x = Math.floor((Math.random() * 14)+ 1);
		var y = Math.floor((Math.random() * 14) + 1);
		repintar[y][x] = 1;
	}
	

	//	Pintamos las celdas de inicio
	pintar();
}


/*
*	Validamos cuantas celdas vecinas están vivas
*/
function vecinos_vivos(i, j) {

	var cuantos = 0;
	var despuesX = i+1;
	var despuesY = j+1;

	for (antesY = j-1; antesY <= despuesY; antesY++)
		for (antesX = i-1; antesX <= despuesX; antesX++)
			if ( antesY > 0 && antesX > 0 && repintar[antesY][antesX] == 1 && !(antesY == j && antesX == i) )
					cuantos++;			

	return cuantos;
}


/*
*	Verificamos las reglas de vida para cada celda
*	y guardamos si vive o muere en la próxima vuelta.
*/
function verifica() {

	for (y = 0; y < grande-1; y++)
		for (x = 0; x < grande-1; x++) {

			cuantos_vivos = vecinos_vivos(x, y);
			genX[y][x] = 0;

			// Muere!
			if (repintar[y][x] == 1 && cuantos_vivos < 2)
				genX[y][x] = 0;

			// Muere!
			else if (repintar[y][x] == 1 && cuantos_vivos > 3)
				genX[y][x] = 0;
			
			// Vive
			else if (repintar[y][x] == 0 && cuantos_vivos == 3)
				genX[y][x] = 1;

			// Vive
			else if (repintar[y][x] == 1)
				genX[y][x] = 1;
		}

	
	// La nueva generación toma el mando
	repintar = genX;


	// Limpiamos la ultima generación
	genX = []
	for (y = 0; y < grande; y++) {		
		genX[y] = [];

		for (x = 0; x < grande; x++)
			genX[y][x] = 0;
	}

	
	// Si aún quedan generaciones por descubrir, damos otra vuelta
	if (repetir > 0 ) {
		console.log(repetir)
		repetir--;
		pintar();
	}
		
}


/*
*	Dibujamos las celdas nuevas o actuales
*/
function pintar() {

	for (y = 0; y < grande; y++)
		for (x = 0; x < grande; x++) {

			// Obtenemos la celda actual
			celdaActual = $('table tr').eq(y).children('td').eq(x);

			// Le damos o quitamos vida a la celda actual
			if (repintar[y][x] == 1)
				celdaActual.addClass('viva');
			else
				celdaActual.removeClass('viva');
		}


	// Dejamos vivir a 1 segundo a cada generación
	setTimeout(function(){ 
		verifica();
	}, 1000);
}

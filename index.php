<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<link rel="stylesheet" href="estilos.css">
	<script src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
	<script src='script.js'></script>

</head>
<body>

	<table>
		<?php

			$grande = 15;
			
			for ($y = 0; $y < $grande; $y++) {
				
				echo '<tr>';

				for ($x = 0; $x < $grande; $x++)						
					echo '<td></td>' ;

				echo '</tr>';
			}
		?>
	</table>
	
</body>
</html>
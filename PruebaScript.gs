function importarEventos() {
  var sheetId = ""; // ID de Google Sheets
  var sheetName = ""; // Nombre de la hoja donde guardarás los datos

  var calendarIds = [
    "email@gmail.com"
  ];

  var spreadsheet = SpreadsheetApp.openById(sheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    SpreadsheetApp.getUi().alert("No se encontró la hoja '" + sheetName + "'. Verifica el nombre.");
    return;
  }

  sheet.clear(); // Borra datos anteriores

  // Agregar encabezados
  var headers = ["Fecha", "Hora Inicio", "Hora Fin", "Evento", "Descripción", "Ubicación", "Cuenta"];
  sheet.appendRow(headers);

  var ahora = new Date(); // Fecha actual
  var finDeAno = new Date(ahora.getFullYear(), 11, 31, 23, 59, 59); // 31 de diciembre del año actual

  calendarIds.forEach(calendarId => {
    var eventos = CalendarApp.getCalendarById(calendarId).getEvents(ahora, finDeAno);

    eventos.forEach(evento => {
      var fila = [
        evento.getStartTime().toLocaleDateString(),
        evento.getStartTime().toLocaleTimeString(),
        evento.getEndTime().toLocaleTimeString(),
        evento.getTitle(),
        evento.getDescription(),
        evento.getLocation(),
        calendarId // Indica de qué cuenta es el evento
      ];
      sheet.appendRow(fila);
    });
  });

  SpreadsheetApp.getUi().alert("Eventos importados hasta el 31 de diciembre.");
}

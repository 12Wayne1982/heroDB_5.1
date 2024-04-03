var emptyRow = "<tr><td colspan='8' class='text-center'> No Records Available</td></tr>";
      
    // A page can't be manipulated safely until the document is "ready." 
    // jQuery detects this state of readiness for you. 
    // Code included inside $( document ).ready() will only run once the page 
    // Document Object Model (DOM) is ready for JavaScript code to execute. 
    $(document).ready(function () {
      // Daten werden in Tabelle geladen
      loadDataFromLocal();

      // EDIT-BUTTON //
      $('#tblData').on('click', '.btn-edit', function () {
        document.getElementById("form-title").innerHTML = "Edit Your Hero";
        // debugger;
        // Jedes Datum (jeder Wert) aus dem Tabellen-Datensatz wird anhand der jeweilige Klasse ausgelesen.
        const name = $(this).parent().parent().find(".txtName").html();
        const alterEgo = $(this).parent().parent().find(".txtAlterEgo").html();
        const publisher = $(this).parent().parent().find(".txtPublisher").html();
        const firstAppearence = $(this).parent().parent().find(".txtFirstAppearence").html();
        const publishingYear = $(this).parent().parent().find(".txtPublishingYear").html();
        const createdBy = $(this).parent().parent().find(".txtCreatedBy").html();
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        
        // Inputfelder bekommen Tabellendaten
          // Die Datensatzwerte werdem den Inputfeldern zugeordnert.
          // Die Inputfelder werden anhand ihrer ID angesprochen-
        $("#txtName").val(name);
        $("#txtAlterEgo").val(alterEgo);
        $("#txtPublisher").val(publisher);
        $("#txtFirstAppearence").val(firstAppearence);
        $("#txtPublishingYear").val(publishingYear);
        $("#txtCreatedBy").val(createdBy);
        $("#txtId").val(id);
        // auf #btnSave steht nicht mehr "Save", sondern "Update".
        $("#btnSave").text("Update");
      });
    
      // DELETE-BUTTON //
        // Sobald auf Button Delete (.btn-delete) gedrückt wird:
      $('#tblData').on('click', '.btn-delete', function () {
        // debugger;
        // id-Wert wird aus Tabellenzeile anhand Klassenname ausgelesen.
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        // id-Wert wird als Parameter übergeben.
        deleteDataFromLocal(id);
      });
    
      // SAVE-BUTTON //
      $("#btnSave").click(function () {
        // debugger;
        if ($("#txtId").val() == '') {
          addDataToLocal();
        } else {
          updateDataFromLocal();
        }
      });

      // CLEAR-BUTTON //
      $("#btnClear").click(function () {
        // debugger;
        clearForm2();
      });
    });

    function clearForm1() {
      document.getElementById("form-title").innerHTML = "Add A New Hero";
      // debugger;
      // Eingabedaten der Inputfelder werden gelöscht.
      $("#txtId").val("");
      $("#txtName").val("");
      $("#txtAlterEgo").val("");
      $("#txtPublisher").val("");
      $("#txtFirstAppearence").val("");
      $("#txtPublishingYear").val("");
      $("#txtCreatedBy").val("");
      // Text von #btnSave wird verändert.
      $("#btnSave").text("Add");
    }

    function clearForm2() {
      // debugger;
      // Eingabedaten der Inputfelder werden gelöscht.
      $("#txtName").val("");
      $("#txtAlterEgo").val("");
      $("#txtPublisher").val("");
      $("#txtFirstAppearence").val("");
      $("#txtPublishingYear").val("");
      $("#txtCreatedBy").val("");
      // Text von #btnSave wird verändert.
      $("#btnSave").text("Add");
    }


    function addEmptyRow() {
      // debugger;
      // Wenn tbody Null Zeilen (records) hat, 
      if ($("#tblData tbody").children().children().length == 0) {
        // dann soll das ausgegeben werden, was in Variable emptyRow gespeichert ist.
        $("#tblData tbody").append(emptyRow);
      }
    }

    // Daten werden in Tabelle geladen:
    function loadDataFromLocal() {
      // debugger;
      // localstorage
        // localstorage kann dauerhaft Daten im Browser speichern.
        // Es kann die Daten aber nur als STRINGS speichern.
      // Daten aus localstorage (key 'localHeroData') werden in Variable localData gespeichert.
      let localData = localStorage.getItem('localHeroData');
      // Wenn es localData gibt, dann befülle tbody,
      if (localData) {
        $("#tblData tbody").html("");
        // Daten werden zurückkonvertiert.
          // JASON.parse() verwandelt Datensatz wieder in Objekt zurück.
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
          let dynamicTR = "<tr>";
          dynamicTR = dynamicTR + "<td> " + index + "</td>";
          dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
          dynamicTR = dynamicTR + "<td class='txtAlterEgo'>" + element.alterEgo + "</td>";
          dynamicTR = dynamicTR + "<td class='txtPublisher'>" + element.publisher + "</td>";
          dynamicTR = dynamicTR + "<td class='txtFirstAppearence'>" + element.firstAppearence + "</td>";
          dynamicTR = dynamicTR + "<td class='txtPublishingYear'>" + element.publishingYear + "</td>";
          dynamicTR = dynamicTR + "<td class='txtCreatedBy'>" + element.createdBy + "</td>";
          dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit'> Edit</button>";
          dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-danger btn-delete'> Delete</button>";
          dynamicTR = dynamicTR + "    </td>";
          dynamicTR = dynamicTR + " </tr>";
          $("#tblData tbody").append(dynamicTR);
          // Nach jedem Schleifendurchlauf wird index (Sr No) um eine Stelle erhöht.
          index++;
        });
      }
      // ansonsten soll 'No Records Available' angezeigt werden.
      addEmptyRow();
    }

    // Neue Datensätze werden in localStorage gespeichert.
    function addDataToLocal() {
      
      debugger;
      // Daten aus localstorage (key 'localHeroData') werden in Variable localData gespeichert.
      let localData = localStorage.getItem('localHeroData');
      // Wenn es schon Daten gibt, dann
      if (localData) {
        // Daten aus localStorage werden von Strings zurückkonvertiert und in localArray gespeichert.
          // JASON.parse() verwandelt Datensatz wieder in Objekt zurück.
        let localArray = JSON.parse(localData);
        // obj wird mit den Inputdaten befüllt.
        const obj = {
          id: localArray.length + 1,
          name: $("#txtName").val(),
          alterEgo: $("#txtAlterEgo").val(),
          publisher: $("#txtPublisher").val(),
          firstAppearence: $("#txtFirstAppearence").val(),
          publishingYear: $("#txtPublishingYear").val(),
          createdBy: $("#txtCreatedBy").val()
        };
        // Der Datensatz in obj wird in localArray gespeichert.
        localArray.push(obj);
        // Die Datensätze in localArray werden in Stringwerte konvertiert
        // und localStorage hinzugefügt.
        localStorage.setItem('localHeroData', JSON.stringify(localArray));
        // Zuletzt wird die Tabelle aktualisiert.
        loadDataFromLocal();
      } 
      // Wenn es noch keine Daten gibt, dann
      else {
        const arryObj = [];
        const obj = {
          // Der Datensatz bekommt id: 1, weil es der erste Datensatz gibt, der erstellt wird.
          id: 1,
          name: $("#txtName").val(),
          alterEgo: $("#txtAlterEgo").val(),
          publisher: $("txtPublisher").val(),
          firstAppearence: $("#txtFirstAppearence").val(),
          publishingYear: $("#txtPublishingYear").val(),
          createdBy: $("#txtCreatedBy").val()
        };
        // Der Datensatz in obj wird in arryObj gespeichert.
        arryObj.push(obj);
        // Die Datensätze in localArray werden in Stringwerte konvertiert
        // und localStorage hinzugefügt.
        localStorage.setItem('localHeroData', JSON.stringify(arryObj));
        // Zuletzt wird die Tabelle aktualisiert.
        loadDataFromLocal();
      }
      // Abschließend werden die Inputfelder gelöscht.
      
      clearForm1();
    }

    // Datensatz wird aktualisiert.
    function updateDataFromLocal() {
      // debugger;
      // Daten aus localStorage (key 'localHeroData') werden in Variable localData gespeichert.
      let localData = localStorage.getItem('localHeroData');

      // Daten aus localStorage werden von Strings zurückkonvertiert und in localArray gespeichert.
          // JASON.parse() verwandelt Datensatz wieder in Objekt zurück.
      // In localArray befinden sich alle Datensätze (records).
      let localArray = JSON.parse(localData);

      // In oldRecord befindet sich EIN Datensatz.
        // Es ist der Datensatz im Array, der die ID mit dem Tabellendatensatz teilt.
        // Es wird der Datensatz herausgesucht, der verändert werden soll.
      const oldRecord = localArray.find(m => m.id == $("#txtId").val());
      // Jetzt werden im Datensatz die alten Werte mit den Werten der Inputfelder ersetzt.
      // Ansschließend werden die neuen Werte in localArray übernommen.
      oldRecord.name = $("#txtName").val();
      oldRecord.alterEgo = $("#txtAlterEgo").val();
      oldRecord.publisher = $("#txtPublisher").val();
      oldRecord.firstAppearence = $("#txtFirstAppearence").val();
      oldRecord.publishingYear = $("#txtPublishingYear").val();
      oldRecord.createdBy = $("#txtCreatedBy").val();

      // Jetzt wird in localStorage (key: localData) der Datensatz aktualisiert,
      // indem localArray als Item gesetzt wird und in Stringform konvertiert wird.
      localStorage.setItem('localHeroData', JSON.stringify(localArray));

      // Tabelle wird neu geladen.
      // Damit werden die aktualisierten Daten angezeigt.
      loadDataFromLocal();
      // Abschließend werden die Werte Inputfelder gelöscht.
      clearForm1();
    }

    function deleteDataFromLocal(id) {
      // debugger;
      // Daten aus localStorage (key 'localHeroData') werden in Variable localData gespeichert.
      let localData = localStorage.getItem('localHeroData');
      // Daten aus localStorage werden von Strings zurückkonvertiert und in localArray gespeichert.
          // JASON.parse() verwandelt Datensatz wieder in Objekt zurück.
      // In localArray befinden sich alle Datensätze (records).
      let localArray = JSON.parse(localData);

      let i = 0;
      while (i < localArray.length) {
        // Die while-Schleife durchsucht jede ID eines Datensatzes des localArray
        // bis die ID gefunden wurde, die als Parameter übergeben wurde.
        // WENN die ID des localArray-Datensatzes mit der Parameter ID üerbeinstimmt... 
        if (localArray[i].id === Number(id)) {
          // DANN wird dieser Datensatz gelöscht.
          localArray.splice(i, 1);
        } else {
          // ANSONSTEN wird i um eine Stelle erhöht, 
          // damit der nächste localArray-Datensatz durchsucht werden kann.
          ++i;
        }
      }
      // Jetzt wird in localStorage (key: localHeroData) der Datensatz aktualisiert,
      // indem localArray als Item gesetzt wird und in Stringform konvertiert wird.
      localStorage.setItem('localHeroData', JSON.stringify(localArray));
      // Tabelle wird neu geladen.
      // Damit werden die aktualisierten Daten angezeigt.
      loadDataFromLocal();
    }
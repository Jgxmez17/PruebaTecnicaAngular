import { Component } from '@angular/core';

@Component({
  selector: 'app-csvupload',
  templateUrl: './csvupload.component.html',
  styleUrls: ['./csvupload.component.css']
})
export class CsvuploadComponent {

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
  
    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result as string;
      if (!csvData) {
        console.error('El archivo CSV está vacío');
        return;
      }
  
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
      const data = [];
     
  
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
      //  const rowData = {};
        const rowData: Record<string, any> = {};
  
        for (let j = 0; j < headers.length; j++) {
          if (j < row.length) {
            rowData[headers[j]] = row[j];
          } else {
            console.warn('La fila ${i + 1} no tiene suficientes columnas');
          }
        }
  
        data.push(rowData);
      }
  
      console.log(data);
    };
  }
  

}

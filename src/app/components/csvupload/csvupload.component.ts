import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-csvupload',
  templateUrl: './csvupload.component.html',
  styleUrls: ['./csvupload.component.css']
})
export class CsvuploadComponent implements AfterViewInit{
  
  @ViewChild('canvas', { static: false }) canvas: ElementRef | undefined;
  ctx: CanvasRenderingContext2D | undefined;
  chart: any;

  data: any[] = [];
  headers: any;


  constructor (){Chart.register(...registerables)}


  ngAfterViewInit() {
    if (this.canvas && this.canvas.nativeElement) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (this.ctx) {
      this.chart = new Chart(this.ctx, {
     type: 'bar',
     data: {
      labels: this.headers,
      datasets: [{
        label: 'CSV Data',
        data: this.data.map((row) => Object.values(row)),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        // yAxes: [{
        //   ticks: {
        //     beginAtZero: true
        //   }
        // }]
      }
    }
  });
      // Configuración de la gráfica
    }
  }
}
  

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
      };
  
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');
      this.data = [];
     
  
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
  
        this.data.push(rowData);
      }
  
      console.log(this.data);
      if (this.chart){
      this.chart.data.labels = this.data.map(item => item.header1);
      this.chart.data.datasets[0].data = this.data.map(item => item.header2);
      this.chart.update();
    }
    };
  }
}

import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-csvupload',
  templateUrl: './csvupload.component.html',
  styleUrls: ['./csvupload.component.css']
})
export class CsvUploadComponent {
  file: File | undefined;
  parsedData: any[] = [];
  headers: string[] = [];
  rows: any[] = [];

  constructor(private papa: Papa) {}

  onSelectFile(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.file) {
      this.papa.parse(this.file, {
        header: true,
        complete: (results: any) => {
          this.headers = results.meta.fields;
          this.rows = results.data;
          // this.parsedData = results.data;
        },
      });
    }
  }
}

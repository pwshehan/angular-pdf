import { Component } from '@angular/core';
import { PdfService } from './pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-pdf';

  constructor(private pdfService: PdfService) {}

  generatePdf() {
    this.pdfService.generatePdf();
  }
}

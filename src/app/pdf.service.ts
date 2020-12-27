import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  pdfMake: any;

  constructor() {}

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  monthToText(number: number) {
    return number.toString(10);
  }

  async generatePdf() {
    await this.loadPdfMaker();
    let payment_items = [
      {
        year: '2021',
        month: '03',
        amount: 5000,
      },
      {
        year: '2021',
        month: '06',
        amount: 5000,
      },
      {
        year: '2021',
        month: '11',
        amount: 5000,
      },
    ];

    let invoice_number = '5fe58eaee46015001fa36f05';
    let date_of_issue = '2020-12-30';
    let billed_user = 'Shehan Pramitha Wijethunga';
    let billed_course = '2020 | Chemistry hall class';
    let billed_course_id = '5fe58eaee46015001fa36f05';
    //
    let itemsTable_body: any = [
      [
        { text: 'Description', bold: true },
        { text: 'Unit price', bold: true, alignment: 'right' },
      ],
    ];
    payment_items.forEach((element) => {
      itemsTable_body.push([
        'Payment for ' +
          element.year +
          ' ' +
          this.monthToText(parseInt(element.month)),
        {
          text: 'LKR ' + element.amount.toString(10) + '.00',
          alignment: 'right',
        },
      ]);
    });

    console.log(itemsTable_body);
    //
    let sub_total = 15000;
    let discount = 0;
    let total = 15000;
    let gen_at = '2020-10-21 @ 19.32';

    const def = {
      pageSize: 'A4',
      info: {
        title: 'Invoice #' + invoice_number + ' | ewings.lk',
        author: 'www.ewings.lk',
        subject: 'Invoice #' + invoice_number,
        keywords: 'ewings.lk',
      },
      content: [
        { text: 'www.ewings.lk', link: 'https://ewings.lk' },
        { text: 'paid', style: 'paid_header' },
        { text: 'Invoice #' + invoice_number, style: 'invoice_number' },
        { qr: invoice_number, fit: '60', style: 'qr_code' },
        {
          text: 'Email: drukuwelaphysicsfoundation@gmail.com',
          style: 'contact_details',
        },
        { text: 'Tel: (+94) 71 606 8438', style: 'contact_details' },
        { text: 'Date of issue', style: 'heading_2' },
        { text: date_of_issue, style: 'normal' },
        { text: 'Billed to', style: 'heading_2' },
        { text: billed_user, style: 'normal' },
        {
          text: 'Course - ' + billed_course + ' (' + billed_course_id + ')',
          style: 'normal',
        },
        {
          style: 'itemsTable',
          table: {
            widths: ['*', 'auto'],
            headerRows: 1,
            body: itemsTable_body,
          },
        },
        {
          style: 'totalTable',
          layout: 'noBorders',
          table: {
            widths: ['*', 30, 'auto'],
            body: [
              [
                { text: 'Sub Total', bold: true, alignment: 'right' },
                '',
                {
                  text: 'LKR ' + sub_total.toString(10) + '.00',
                  alignment: 'right',
                  margin: [0, 0, 5, 0],
                },
              ],
              [
                { text: 'Discount', bold: true, alignment: 'right' },
                '',
                {
                  text: 'LKR ' + discount.toString(10) + '.00',
                  alignment: 'right',
                  margin: [0, 0, 5, 0],
                },
              ],
              [
                { text: 'Total', bold: true, alignment: 'right' },
                '',
                {
                  text: 'LKR ' + total.toString(10) + '.00',
                  alignment: 'right',
                  bold: true,
                  margin: [0, 0, 5, 0],
                },
              ],
            ],
          },
        },
        { text: 'Note', style: 'heading_2' },
        { text: 'This is an auto generated invoice.', style: 'normal' },
        // { text: gen_at, style: 'normal' },
      ],
      styles: {
        paid_header: {
          fontSize: 36,
          alignment: 'right',
        },
        invoice_number: {
          fontSize: 11,
          alignment: 'right',
          bold: true,
        },
        qr_code: {
          alignment: 'right',
          margin: [0, 10, 0, 20],
        },
        contact_details: {
          alignment: 'right',
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        heading_2: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 0],
        },
        normal: {
          fontSize: 11,
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        itemsTable: {
          margin: [0, 15, 0, 0],
          fontSize: 11,
        },
        totalTable: {
          margin: [0, 0, 0, 15],
          fontSize: 11,
        },
      },
    };
    this.pdfMake.createPdf(def).open();
  }
}

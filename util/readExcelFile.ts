import Exceljs from "exceljs";
 
 
export class readExcelFile{
    public async getUserCredentials(){
        const workBook=new Exceljs.Workbook();
        await workBook.xlsx.readFile('tests/Data/datasheet2.xlsx');
        const worksheet=workBook.getWorksheet('Credentials');
        if (!worksheet) {
            throw new Error('Worksheet "Sheet1" not found');
        }
 
        let cellValue: any;
        let data: string[] = [];
        for (let col = 1; col <= worksheet.columnCount; col++) {
            cellValue = worksheet.getRow(2).getCell(col).value;
            if (cellValue) {
                data.push(cellValue);
            }
        }
        return data;
    }
 
    public async getProductName(){
        const workBook=new Exceljs.Workbook();
        await workBook.xlsx.readFile('tests/Data/datasheet2.xlsx');
        const worksheet=workBook.getWorksheet('ProductName');
        if (!worksheet) {
            throw new Error('Worksheet "Sheet2" not found');
        }
 
        let cellValue: any;
        let data: string[] = [];
        let currentRow = 2;
        do {
            cellValue = worksheet.getRow(currentRow).getCell(1).value;
            if (cellValue) {
                data.push(cellValue);
            }
            currentRow++;
        } while (cellValue);
 
        return data;
   
    }
    public async getUserDetails(){
        const workBook=new Exceljs.Workbook();
        await workBook.xlsx.readFile('tests/Data/datasheet2.xlsx');
        const worksheet=workBook.getWorksheet('UserDetails');
        if (!worksheet) {
            throw new Error('Worksheet "Sheet3" not found');
        }
 
        let cellValue: any;
        let data: string[] = [];
        for (let col = 1; col <= worksheet.columnCount; col++) {
            cellValue = worksheet.getRow(2).getCell(col).value;
            if (cellValue) {
                data.push(cellValue);
            }
        }
 
        return data;
    }
}
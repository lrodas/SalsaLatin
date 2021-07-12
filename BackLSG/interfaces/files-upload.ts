export interface FileUpload {
    name: string;
    data: any;
    encoding: string;
    tempFilePath: string;
    tuncated: boolean;
    mimetype: string;
    md5: string;

    mv: Function;
}

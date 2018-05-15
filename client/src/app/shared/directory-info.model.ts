export class DirectoryInfo {

  constructor(
    public id: string = '',
    public parentDirectory: DirectoryInfo = null,
    public directories: string[] = [],
    public files: string[] = []
  ) { }

}

export const ROOT_DIRECTORY = new DirectoryInfo();

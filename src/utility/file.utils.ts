import fs from 'fs-extra';

export class FileUtils {
  async createFolder(path: string): Promise<void> {
    try {
      await fs.mkdir(path);
      console.log(`Folder ${path} created successfully!`);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteFolder(path: string): Promise<void> {
    try {
      await fs.remove(path);
      console.log(`Folder ${path} deleted successfully!`);
    } catch (err) {
      console.error(err);
    }
  }

  async renameFolder(oldPath: string, newPath: string): Promise<void> {
    try {
      await fs.move(oldPath, newPath);
      console.log(`Folder ${oldPath} renamed to ${newPath} successfully!`);
    } catch (err) {
      console.error(err);
    }
  }

  async createFile(path: string, content: string): Promise<void> {
    try {
      await fs.outputFile(path, content);
      console.log(`File ${path} created successfully!`);
    } catch (err) {
      console.error(err);
    }
  }

  async editFile(path: string, content: string): Promise<void> {
    try {
      await fs.writeFile(path, content);
      console.log(`File ${path} edited successfully!`);
    } catch (err) {
      console.error(err);
    }
  }

  async renameFile(oldPath: string, newPath: string, content?: string): Promise<void> {
    try {
      await fs.move(oldPath, newPath);
      console.log(`File ${oldPath} renamed to ${newPath} successfully!`);

      if(content) {
        await fs.writeFile(newPath, content);
        console.log(`File ${newPath} content updated successfully!`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async deleteFile(path: string): Promise<void> {
    try {
      await fs.remove(path);
      console.log(`File ${path} deleted successfully!`);
    } catch (err) {
      console.error(err);
    }
  }
}
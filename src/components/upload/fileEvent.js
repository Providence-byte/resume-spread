import { nanoid } from "nanoid";
class FileEvent {
  constructor(file) {
    this.file = file;
    this.uuid = nanoid();
    const types = file?.type?.split("/") || [];

    // console.log(reader.readAsDataURL(file));
    this.fileType = types.length ? types[0] : "";
    /**
     * @description 本地预览地址
     */
    this.base64URL = window.URL.createObjectURL(file);
    // this.base64Data = ''
  }

  // 释放创建过的URL，不然会存在性能问题
  // 详情可见 : https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
  // revokeFileBase64URL(base64URL) {
  //   window.URL.revokeObjectURL(base64URL);
  // }

  upload() {}
  cancel() {}
  retry() {}
}

export default FileEvent;

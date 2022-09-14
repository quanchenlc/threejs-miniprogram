/**
 * Created by quanchen on 2022/9/13.
 */
function _isRelativePath(url) {
  return !(/^(http|https|ftp|wxfile):\/\/.*/i.test(url));
}

export const fetch=(req)=>{
  console.log('fetch v0:',req);
  console.log('fetch this:',this);
  // let response=null;

  return new Promise((resolve, reject) => {
    const url=req.url;
    // eslint-disable-next-line
    const header=req.headers.get('content-type');
    // eslint-disable-next-line
    const responseType='text';
    // eslint-disable-next-line
    const dataType='string';

    const method='GET';

    const relative=_isRelativePath(url);
    let encoding;
    if(responseType==='arraybuffer'){
      encoding='binary';
    }else {
      encoding='utf8';
    }

    // response=null;

    const onSuccess=(data)=>{
      console.log('onSuccess data:',data);
      resolve(data);
    };

    const onFail=({errMsg})=>{
      reject(errMsg);
    };

    if(relative){
      const fs=wx.getFileSystemManager();
      const options={
        filePath:url,
        success:onSuccess,
        fail:onFail,
      }
      if(encoding){
        options['encoding']=encoding;
      }
      fs.readFile(options);
      return;
    }

    wx.request({
        data:'',
        url,
        method,
        header,
        dataType,
        responseType,
        success:onSuccess,
        fail:onFail
    })
  })
}

/**
 * Created by quanchen on 2022/9/13.
 */
import EventTarget from "./EventTarget";

export default class Request extends EventTarget{

  constructor(url,init) {
    super();
    this.url=url;
    this.headers=init.headers;
    this.credentials=init.credentials;

    console.log('Request:',url,init);
  }
}

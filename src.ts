import { serve } from "https://deno.land/std@0.92.0/http/server.ts";

let server = (port:number) => {

    interface obj {
        link:string
        callback: Function 
    }

    class Pz {
    
    private server;
    private object:obj[] = [];

    constructor(port:number) {
        this.server = serve({ port });
    }
    //add to route list
    public router(l:string,c:Function) {
        this.object.push(
        {
            link:l,
            callback:c
        })
    }

    public async listen() {
        for await (const req of this.server) {
            for(let num in this.object) {
            if (req.url == this.object[num].link) {
                //Render habdler
                let render = (template:string):Promise<string | void> => {
                    const text = Deno.readTextFile(`./${template}`);
                    return text.then((response) => {
                        return req.respond({body:`${response}`})
                    });     
                }

                let request = {
                    api:req,
                    render:render
                }

                this.object[num].callback(request)
            }
            }
        }
    }
    }

    let instance = new Pz(8000)
    return instance
}

export default server
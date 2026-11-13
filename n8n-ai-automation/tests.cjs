const fs=require('fs'),path=require('path'),assert=require('assert');let checks=0;
for(const dir of fs.readdirSync(__dirname).filter(x=>fs.existsSync(path.join(__dirname,x,'workflow.json')))){
const read=f=>JSON.parse(fs.readFileSync(path.join(__dirname,dir,f)));
const w=read('workflow.json'), sample=read('sample-input.json'),out=read('example-output.json').result;
const names=new Set(w.nodes.map(n=>n.name));assert.equal(names.size,w.nodes.length);checks++;
for(const c of Object.values(w.connections))for(const group of c.main)for(const edge of group)assert(names.has(edge.node));checks++;
const prep=w.nodes.find(n=>n.name==='Prepare Request').parameters.jsCode;
const run=(code,input)=>new Function('$input','$',code)({first:()=>({json:input})},()=>({first:()=>({json:{input:sample}})}));
assert(run(prep,sample)[0].json.request.messages.length===2);checks++;
assert.throws(()=>run(prep,{}));checks++;
assert.throws(()=>run(prep,{text:'x'.repeat(41000)}));checks++;
const code=w.nodes.find(n=>n.name==='Validate Result').parameters.jsCode;
const response=value=>({choices:[{finish_reason:'stop',message:{content:JSON.stringify(value)}}]});
assert.equal(run(code,response(out))[0].json.status,'needs_human_review');checks++;
assert.throws(()=>run(code,response({})));checks++;
assert.throws(()=>run(code,{choices:[{finish_reason:'length',message:{content:'{}'}}]}));checks++;
}console.log(checks+' fixture and graph checks passed. Live n8n/API execution not tested.');
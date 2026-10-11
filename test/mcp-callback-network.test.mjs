import test from 'node:test';
import assert from 'node:assert/strict';
import {isPublicCallbackIp,parseMcpCallbackUrl} from '../lib/mcp-callback-network.mjs';

test('callback address policy blocks special-purpose space including public service exceptions',()=>{
 for(const ip of ['0.1.2.3','10.0.0.1','100.64.0.0','100.127.255.255','127.255.255.254','169.254.169.254','172.16.0.0','172.31.255.255','192.0.0.9','192.0.2.1','192.31.196.1','192.52.193.1','192.88.99.1','192.168.1.1','192.175.48.1','198.18.0.0','198.19.255.255','198.51.100.1','203.0.113.1','224.0.0.1','239.255.255.255','240.0.0.1','255.255.255.255','::','::1','::ffff:8.8.8.8','::ffff:808:808','64:ff9b::808:808','100::1','100:0:0:1::1','2001::1','2001:1::3','2001:20::1','2001:1ff:ffff::1','2001:db8::1','2002::1','2620:4f:8000::1','3fff:fff:ffff::1','5f00::1','fc00::1','fe80::1','ff02::1'])assert.equal(isPublicCallbackIp(ip),false,ip);
 for(const ip of ['8.8.8.8','1.1.1.1','100.63.255.255','100.128.0.0','172.15.255.255','172.32.0.0','192.0.1.1','198.17.255.255','198.20.0.0','223.255.255.255','2001:200::1','2001:4860:4860::8888','2606:4700:4700::1111','3ffe:ffff::1'])assert.equal(isPublicCallbackIp(ip),true,ip);
});
test('callback IP parsing rejects encodings, zone IDs and non-string coercion',()=>{
 for(const ip of [undefined,{},'127.1','2130706433','0x7f000001','010.0.0.1','8.8.8.8 ','[2606:4700::1]','2606:4700::1%eth0','2001:4860::8.8.8.8','2001:::1','8.8.8.256'])assert.equal(isPublicCallbackIp(ip),false);
});
test('callback URLs normalize only admissible HTTPS FQDNs',()=>{
 assert.deepEqual(parseMcpCallbackUrl('https://CALLBACK.agentfriendlyweb.dev:443/a?x=1'),{hostname:'callback.agentfriendlyweb.dev',path:'/a?x=1'});
 for(const url of ['http://example.com/','https://example.com:8443/','https://u:p@example.com/','https://example.com/#','https://127.1/','https://0x7f000001/','https://[2606:4700::1]/','https://example.com./','https://localhost/','https://a.localhost/','https://a.internal/','https://a.test/','https://-a.example.com/','https://example.com/\r\nfoo',' https://example.com/',{toString(){throw Error('must not coerce');}}])assert.throws(()=>parseMcpCallbackUrl(url),/Invalid MCP callback destination/);
});

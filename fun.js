!function(a,b){"use strict";var c="fun";return"object"==typeof module&&"object"==typeof module.exports?void(module.exports=b(a)):"function"==typeof define&&define.amd?void define(c,b):void(a[c]=b(a))}(this,function(){"use strict";var a=Object.prototype,b=Array.prototype,c=Function.prototype,d=function(a,b){return"undefined"==typeof b?c.apply.bind(a):c.apply.bind(a,b)},e=function(a,b){return"undefined"==typeof b?c.call.bind(a):c.call.bind(a,b)},f=e(b.slice),g=e(a.toString),h=e(a.hasOwnProperty),i=function(){},j=function(a){return a},k=function(a){return null===a||void 0===a},l=function(a,b){return k(a)?b:a},m=Object.create?function(){return Object.create(null)}:function(){return{}},n=l(Array.isArray,function(a){return"[object Array]"===g(a)}),o=function(a){return a===+a},p=function(a,b){return g(a)===g(b)},q=function(a,b){return g(a)!==g(b)},r=function(a){return k(a)?!1:a?(a=""+a,"null"!==a&&"undefined"!==a&&"0"!==a&&"false"!==a&&"off"!==a&&"no"!==a):!1},s=function(a){return k(a)?!0:a?(a=""+a,"null"===a||"undefined"===a||"0"===a||"false"===a||"off"===a||"no"===a):!0},t=function(a){return!!a},u=function(a){for(var b=1,c=arguments.length;k(a)&&c>b;)a=arguments[b],b+=1;return k(a)?{}:a},v=function(a){for(var b=1,c=arguments.length;k(a)&&c>b;)a=arguments[b],b+=1;return k(a)?"":""+a},w=function(a){var b,c=arguments.length;for(b=0;c>b;b+=1)if(a=parseFloat(""+arguments[b]),!k(a)&&!isNaN(a)&&isFinite(a))return a;return 0},x=function(a){var b,c=[];a=u(a);for(b in a)h(a,b)&&c.push(a[b]);return c},y=function(){var a,b,c=arguments.length;for(a=0;c>a;a+=1)if(b=arguments[a],!k(b))return n(b)?b:x(b);return[]},z=function(a){return function(b){return u(b)[a]}},A=function(a){return function(b){var c,d,e;if(k(b))return b;for(d=v(a).split("."),e=d.length,c=0;e>c;c+=1)if(b=b[d[c]],k(b))return b;return b}},B=function(a,b){var c=a.bind(b);return function(b){var d,e;if(k(b)||k(a))return b;if(d=b.length,!o(d)){for(e in b)if(h(b,e)&&null===c(b[e],e,b))return b;return b}for(e=0;d>e;e+=1)if(null===c(b[e],e,b))return b;return b}},C=function(){},D=function(a){return a=u(a),function(b){return l(a[v(b)],a[""])}},E=function(a){return a=u(a),function(){var b,c,d;d=f(arguments);for(b in a)if(h(a,b)&&(c=v(a(b).apply(this,d))))return c;return""}},F=function(a){return{nil:function(){return k(a)}}},G=function(){},H=function(a){var b=f(arguments,1);return function(){return a.apply(this,b.concat(f(arguments)))}},I=function(a,b){a=l(a,i),b=w(b,a.length);var c=function(){var c=b-arguments.length;return 0>=c?a.apply(this,arguments):I(H.apply(this,[a].concat(f(arguments))),c)};return c.toString=function(){return a.toString()},c.curried=!0,c};return G.string=g,F.array=n,F.number=o,{noop:i,ident:j,nil:k,streq:p,nostreq:q,truthy:r,falsy:s,bool:t,ensure:l,empty:m,object:u,string:v,number:w,array:y,dot:z,nav:A,iterator:B,extend:C,switcher:D,selector:E,stategist:i,enclose:i,to:G,is:F,curry:H,acurry:I,slice:f,owns:h,cbind:e,abind:d}});
//# sourceMappingURL=fun.map
(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(require("../moment")):typeof define=="function"&&define.amd?define(["moment"],t):t(e.moment)})(this,function(e){function r(e){return e>1&&e<5}function i(e,t,n,i){var s=e+" ";switch(n){case"s":return t||i?"pár sekúnd":"pár sekundami";case"m":return t?"minúta":i?"minútu":"minútou";case"mm":return t||i?s+(r(e)?"minúty":"minút"):s+"minútami";case"h":return t?"hodina":i?"hodinu":"hodinou";case"hh":return t||i?s+(r(e)?"hodiny":"hodín"):s+"hodinami";case"d":return t||i?"deň":"dňom";case"dd":return t||i?s+(r(e)?"dni":"dní"):s+"dňami";case"M":return t||i?"mesiac":"mesiacom";case"MM":return t||i?s+(r(e)?"mesiace":"mesiacov"):s+"mesiacmi";case"y":return t||i?"rok":"rokom";case"yy":return t||i?s+(r(e)?"roky":"rokov"):s+"rokmi"}}var t="január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),n="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),s=e.defineLocale("sk",{months:t,monthsShort:n,monthsParse:function(e,t){var n,r=[];for(n=0;n<12;n++)r[n]=new RegExp("^"+e[n]+"$|^"+t[n]+"$","i");return r}(t,n),weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:i,m:i,mm:i,h:i,hh:i,d:i,dd:i,M:i,MM:i,y:i,yy:i},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});return s});
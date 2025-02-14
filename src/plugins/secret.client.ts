const f15 = `
     .-------------------------------------------------------------.
     |                              _                              |
     |                            >"/                       .   '  |
     |                           /'/   ,        '            '  '  |
     |      ,--,.  ,    .     ' /'/                    ,           |
     |     <C-:\`:\`.      ,.    /'i            x/   '               |
     |      \\\\ \\\`:,2-.   \\\\"-.//.'           //  ,            '    |
     |       \\\\,>'v ;.\`-. \\::/  <      ,  ' /:                     |
     |        \\\\\`. \`.'\`. \`-'<;-".i"+.    , /:'                     |
     |         \\\\ \`. x"_"</.\`-:,. i)|.-.  /;'              ,       |
     |       ,:TX\\ .2'"."':-.;;:-'"-\`.;;|/'/                       |
     |      ;','=>:,-'",-'.-\`-u._-'. \`=.','\`'-._                   |
     |     ' .'c;-" -.^,-' . .'  x,.-+-Y.c._"-._:=.     ,          |
     |       ;'. .-"-.\`.  ,-: ,-"v\`-._Y-.\`-.""\`---'                |
     |      <_ -"doo \`v' / \`.".-'"-'_ "-<:-.:-._      ,            |
     |       2"-:    .C'". _,\`;-",'._"\`-.=+:"--.:-.                |
     |     ,: P  Y,c"  "i,^)_.+-<==.,__-'-..:_--.';"\\              |
     |   .'c\`+..='"i".._ ,-" _.+;,x;;.-""\`\`--+::_/  .>             |
     | .C.,-"=\`\`.  ;-"  '\`"\`'  ,'",''            """'              |
     |/   +  . _:-"                    _______    _____  ________  |
    .' .:::)_.'                       dHHHHHHP   dHHHHP dHHHHHHP'  |
   / .::;:-'                         dHHP___  __  dHHP dHHP___     |
  /_;:-"                            dHHHHHHP dHP HHHP dHHHHHHP     | 
  "  \`---------------------------- dHHP ------- dHHP ____dHHP -----' 
            coded by baxthus      dHHP         dHHP dHHHHHHP

`;
const artStyle = 'color: #cba6f7;';
const alertStyle = 'color: red; font-size: 20px; font-weight: bold;';

export default defineNuxtPlugin(() => {
  console.log('%c' + f15, artStyle);
  console.log('%c' + 'Pasting anything here may give attackers access to your account.', alertStyle);
});

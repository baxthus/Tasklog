/* eslint-disable no-irregular-whitespace */
const art = `
<!--
            ＿＿
　　　　　🌸＞　　フ
　　　　　| 　_　 _|
　 　　　／\` ミ_wノ
　　 　 /　　　 　 |
　　　 /　 ヽ　　 ﾉ
　 　 │　　|　|　|
　／￣|　　 |　|　|
　| (￣ヽ＿_ヽ_)__)
　＼二つ

-->
`;

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.bodyAppend.push(art);
  });
});

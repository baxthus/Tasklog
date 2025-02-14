const alertStyle = 'color: red; font-size: 20px; font-weight: bold;';

export default defineNuxtPlugin(() => {
  console.log('%c' + 'Pasting anything here may give attackers access to your account.', alertStyle);
});

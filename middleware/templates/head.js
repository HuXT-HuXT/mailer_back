const Head = `
<mj-font name="Nunito"
	href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap" />

<mj-attributes>
	<mj-all font-family="Nunito" padding="0" line-height="1.2" background-color="white" />
	<mj-section padding="15px 20px 15px 20px" />
</mj-attributes>

<mj-style inline="inline">
	.link-nostyle { color: inherit; text-decoration: none;}
</mj-style>

<mj-style inline="inline">
	.underlined {color: inherit; text-decoration: none; border-bottom: 1px solid #eee;}
</mj-style>

<mj-style inline="inline">
	.colored-links a {color: #866; text-decoration: none; border-bottom: 1px solid #ddd;}
</mj-style>

<mj-style inline="inline">
	.button-red {background: #a00; color: #eee; border-radius: 5px; padding: 3px 5px;}
</mj-style>

<mj-style inline="inline">
	.button-blue {background: #1188de; color: #eee; border-radius: 5px; padding: 3px 5px;}
</mj-style>

<mj-style>
  @media only screen and (max-width: 450px) {
    .center-on-mobile > table {
      margin: 0 auto !important;
    }
</mj-style>

<mj-style>
  @media only screen and (max-width: 450px) {
    .hide-on-mobile {
      display: none !important;
    }
</mj-style>
`;

export default Head;

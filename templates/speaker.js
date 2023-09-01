const Speaker = `
<mj-wrapper>

	<mj-section padding-bottom="8px">
		<mj-column>
            <mj-text font-size="28px" align="center" color="#a64d79" font-weight="bold" padding-bottom="8px">Спикер </mj-text>
		</mj-column>
	</mj-section>

	<mj-section padding-top="0">
		<mj-column>
            <mj-image align="center" width="150px" padding-bottom="8px" src="{{ speaker.photo }}" />
            <mj-text color="#555" font-style="italic" font-size="20px" align="center" font-weight="bold" padding-bottom="5px">{{ speaker.firstName }} {{ speaker.middleName }} {{ speaker.lastName }}</mj-text>
            <mj-text font-size="16px" align="center" padding-bottom="8px">{{ speaker.regalia }}</mj-text>
		</mj-column>
	</mj-section>

</mj-wrapper>
`;

export default Speaker;

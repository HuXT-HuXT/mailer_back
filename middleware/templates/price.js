const Price = `
<mj-wrapper>

	<mj-section padding-bottom='5px'>
		<mj-column>
            {{#if price}}
                <mj-text color="#a64d79" font-size="26px" align="center" font-weight="bold">Стоимость {{ price }} рублей</mj-text>
            {{/if}}

            {{#unless price}}
                <mj-text color="#a64d79" font-size="30px" align="center" font-weight="bold">Семинар бесплатный</mj-text>
            {{/unless}}

            {{#if procurementPrice}}
                <mj-text color="#a64d79" font-size="22px" align="center" font-weight="bold" padding-bottom="8px">или закупка препаратов на {{ procurementPrice }} рублей </mj-text>
            {{/if}}
		</mj-column>
	</mj-section>

    {{#if discountPercent}}
        <mj-section padding-top='5px'>
            <mj-column>
                    <mj-text font-size="16px" color="#555" align="center">Предоставляется скидка на продукцию {{ discountPercent }}% при покупке на семинаре</mj-text>
            </mj-column>
        </mj-section>
    {{/if}}

	<mj-section padding-bottom="25px">
		<mj-column>
            <mj-button font-size="20px" background-color="#a64d79" href="{{ registrationUrl }}" color="white">Зарегистрироваться</mj-button>
		</mj-column>
	</mj-section>

</mj-wrapper>
`;

module.exports = { Price };

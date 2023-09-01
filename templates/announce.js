const Announce = `
<mj-wrapper>

	<mj-section>
		<mj-column padding="10px 0 10px 0">
            <mj-text font-size="18px" padding-bottom="8px">Приглашаем Вас посетить семинар {{getFirstLetter speaker.firstName }}{{getFirstLetter speaker.middleName }} {{ speaker.lastNameGenitive }}<br><b>"{{ title }}"</b>.
			</mj-text>
            <mj-text font-size="18px">Он состоится <b>{{ getDayAndMonth date }}</b> с {{ getTime startTime }} до {{ getTime endTime }} (МСК).
			</mj-text>
		</mj-column>
	</mj-section>

	<mj-section>
		<mj-column>
                <mj-button font-size="20px" background-color="#a64d79" href="{{ registrationUrl }}" color="white">Зарегистрироваться на семинар</mj-button>
		</mj-column>
	</mj-section>

</mj-wrapper>
`;

export default Announce;

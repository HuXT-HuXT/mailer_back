const LegalNotice = `
<!-- Legal notice -->
<mj-section background-color="none">
	<mj-column vertical-align="middle" background-color="none">
		<mj-text padding-bottom="8px" align="center" color="#777">
            Вы получили эту рассылку, т.к. участвовали в мероприятиях компании «АСТРАМЕД»
		</mj-text>
		<mj-text padding-bottom="8px" align="center" color="#777">{{{{raw}}}} <a class="unsub_link" href="%ОТПИСАТЬСЯ%">Отписаться</a> {{{{/raw}}}} </mj-text>
	</mj-column>
</mj-section>
<!-- End Legal notice -->
`;

module.exports = { LegalNotice };

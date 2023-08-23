const UpcomingEvents = `
<mj-wrapper>

	<mj-section padding-bottom="5px">
		<mj-column>
            <mj-text font-size="26px" font-weight="bold">Предстоящие семинары</mj-text>
		</mj-column>
	</mj-section>

	<mj-section>
        {{#each upcomingEvents}}
            <mj-column width="100%" vertical-align="middle">
                    <mj-text font-size="16px" align="left" padding-bottom="6px">• <a href="{{this.registrationUrl}}">{{this.title}}</a></mj-text>
            </mj-column>
        {{/each}}
	</mj-section>

</mj-wrapper>
`;

export default UpcomingEvents;

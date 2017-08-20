
const template = `
	<div class="last-reading">
		<p class="last-reading__level">{{lastReading.level}} {{lastReading.icon}}</p>
		<p data-timestamp datetime="{{lastReading.timestamp}}"><p>
	</div>

	<div class="action">
		<a href="#" class="btn btn--stripe">Take Action</a>
		<p><strong>{{lastReading.level}}</strong> is a little high, take action?</p>
	</div>


	<div class="readings">
		<h4 class="readings__label">Past readings</h4>
		<ul>
			{{#readings}}
				<li>
					<span class="reading__icon">{{icon}}</span>
					<p class="reading__level">{{level}}</p>
					<p class="reading__exact-timestamp">{{friendlyTime}}</p>
					<p class="reading__timestamp">
						/<span data-timestamp datetime="{{timestamp}}"></span>
					</p>
				</li>
			{{/readings}}
		</ul>
	</div>
`;

export default template;
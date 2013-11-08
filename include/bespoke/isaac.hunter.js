var one;

function slidesToGrid()
{
	$('#portfolio article').removeClass("animate");
	$('#portfolio section').removeAttr("style");
	$('#portfolio section.bespoke-active').css({
				'z-index':'50',
				"left" : "12%",
				"bottom" : "5%",
				"top" : "5%",
				"right" : "12%",
				'width' : '76%',
				'height' : '90%'
	});
	setTimeout(function() {
		viewGrid();
	}, 150);
}
function viewGrid()
{
	$('#portfolio').addClass('grid');
	$('#portfolio').removeClass('slides');
	i = 0;
	j = 0;
	k = 0;
	$('#portfolio.grid section').each(function () {
		$(this).removeClass();
		$(this).css({
			"left" : i + '%',
			"bottom" : (55 - j) + '%',
			"top" : j + '%',
			"right" : (70 - i) + '%',
			"width" : '30%',
			"height" : '45%'
		});

		$(this).attr('id', k);
		i += 35;
		k ++;
		if (i > 100)
		{
			i = 0;
			j += 55;
		}

	});

	$('#portfolio.grid section').click(function() {
		$('#portfolio section').css({"z-index" : "0"});
		that = this;
		$(that).addClass('clicked');

		setTimeout(function() {
			$(that).css({
				'z-index':'50',
				"left" : "12%",
				"bottom" : "5%",
				"top" : "5%",
				"right" : "12%",
				'width' : '76%',
				'height' : '90%'
			});
		}, 100);
			
		setTimeout(function() {
			viewSlides($(that).attr('id'));
		}, 1000);
	});
}
function viewSlides(index)
{
	$('#portfolio section').removeAttr("style");
	$('#portfolio').addClass('slides')
	$('#portfolio').removeClass('grid');
	one = bespoke.horizontal.from('#portfolio.slides > article');
	one.slide(index);
	setTimeout(function() {
		$('#portfolio article').addClass("animate");
	}, 800);
	$('#portfolio > .close-x').click( function () {
		slidesToGrid();
	});
} 
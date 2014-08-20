$(function()
{
	if (typeof prettyPrint != 'undefined') prettyPrint();

	if (window.devicePixelRatio >= 1.5)
	{
		var images = $("img.hires");
		for (var i = 0; i < images.length; i++)
		{
			var imageType = images[i].src.substr(-4);
			var imageName = images[i].src.substr(0, images[i].src.length - 4);
			imageName += "@2x" + imageType;
			images[i].src = imageName;
		}
	}
});


function showInvoiceForm(el)
{
	$('#invoiceForm-box').slideDown(function() { $(this).find('textarea')[0].focus(); });
	return false;

}

function hideInvoiceForm()
{
	$('#invoiceForm-box').slideUp();
	return false;
}

function showPasswordForm(el)
{
	$(el).hide();
	$('#passwordForm-box').slideDown(function() { $(this).find('input')[0].focus(); });
	return false;
}

function hidePasswordForm()
{
	$('#passwordForm-box').slideUp(function() { $('#change-password-control').show(); });
	return false;
}


function sendPassword()
{
	$.ajax({
		url: '/webAjax/users/change/',
		type: 'post',
		data: $('#changePasswordForm').serialize(),
		success: function()
		{
			$('#changePasswordForm').html('<p>Password was successfully changed.</p>');
		}
	});

	return false;
}

function sendChangeEmail()
{
	$.ajax({
		url: '/webAjax/users/changeEmail/',
		type: 'post',
		data: $('#changeEmailForm').serialize()
	});

	setTimeout(function()
	{
		$('#changeEmailForm').html('<p>We sent you a mail confirmation the new email. Please, check your mailbox.</p>');
	}, 100);


	return false;
}

function showEmailForm(el)
{
	$(el).hide();
	$('#emailForm-box').slideDown(function() { $(this).find('input')[0].focus(); });
	return false;
}

function hideEmailForm()
{
	$('#emailForm-box').slideUp(function() { $('#change-email-control').show(); });
	return false;
}

function sendForgot()
{
	var data = $('#recoveryForm').serialize();
	$('#recoveryForm').html('<p>Password has been successfully sent to your email.</p>');

	$.ajax({
		url: '/webAjax/users/forgot/',
		type: 'post',
		data: data
	});

	return false;
}

function sendLogin(place, redir)
{
	var formID = '#loginForm';
	if (place === true) formID = '#loginFormPlace';


	$.ajax({
		url: '/webAjax/users/login/',
		type: 'post',
		data: $(formID).serialize(),
		success: function(data)
		{
			top.location.href = '/account/';
		}
	});

	return false;
}

function sendReg(place, redir)
{
	var formID = '#regForm';
	if (place === true) formID = '#regFormPlace';

	var data = $(formID).serialize();

	$.ajax({
		url: '/webAjax/users/reg/',
		type: 'post',
		data: data,
		success: function()
		{
			$.ajax({
				url: '/webAjax/users/sendRegEmail/',
				type: 'post',
				data: 'user_email=' + $('#user_email').val()
			});

			setTimeout(function()
			{
				top.location.href = '/account/';
			}, 10);

		}
	});


	return false;
}

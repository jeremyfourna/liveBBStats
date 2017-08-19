import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { savePoints, saveAction, getDataFromElement, setDataInsideElement, setTextInsideElement } from './utils.js';
import R from 'ramda';
import $ from 'jquery';

import './playerModal.jade';

function removeCancelAction() {
	$('.actionBadge').remove();
	$('#correctionAction').removeClass('cancelCorrectionAction');
	$('.buttonForAction').removeClass('cancelAction');
}

Template.playerModal.events({
	'show.bs.modal #playerModal': function(event) {
		const button = $(R.prop('relatedTarget', event)); // Button that triggered the modal
		const firstName = button.data('firstname') || TAPi18n.__('firstName');
		const lastName = button.data('lastname') || TAPi18n.__('lastName');

		setDataInsideElement('#playerModal', 'playerid', button.data('playerid'));
		setTextInsideElement('.modal-title', `${TAPi18n.__('whoIsDoingThisAction')} ${TAPi18n.__('num')}${button.data('jersey')} : ${firstName} ${lastName}`);
	},
	'click #correctionAction': function() {
		$('.buttonForAction').prepend('<span class=\'badge actionBadge\'>-1</span> ')
			.addClass('cancelAction');
		$('#correctionAction').addClass('cancelCorrectionAction')
			.text(TAPi18n.__('cancelCorrectionAction'));
	},
	'click #closeModalButton': removeCancelAction,
	'click .cancelCorrectionAction': function() {
		$('.actionBadge').remove();
		$('#correctionAction').removeClass('cancelCorrectionAction')
			.text(TAPi18n.__('correctionAction'));
		$('.buttonForAction').removeClass('cancelAction');
	},
	'hidden.bs.modal .modal': removeCancelAction,
	// Positive action
	'click #onePoint': function() {
		return savePoints(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			'yourClubTeamId',
			'Teams.correctOnePointIn',
			'Teams.onePointIn',
			1,
			R.path(['data', 'gameData'], Template.instance())
		);
	},
	'click #twoPoints': function() {
		return savePoints(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			'yourClubTeamId',
			'Teams.correctTwoPointsIn',
			'Teams.twoPointsIn',
			2,
			R.path(['data', 'gameData'], Template.instance())
		);
	},
	'click #threePoints': function() {
		return savePoints(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			'yourClubTeamId',
			'Teams.correctThreePointsIn',
			'Teams.threePointsIn',
			3,
			R.path(['data', 'gameData'], Template.instance())
		);
	},
	'click #assist': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctAssist',
			'Players.assist'
		);
	},
	'click #offReb': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctOffReb',
			'Players.offReb'
		);
	},
	'click #defReb': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctDefReb',
			'Players.defReb'
		);
	},
	'click #provOffFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctProvOffFoul',
			'Players.provOffFoul'
		);
	},
	'click #steal': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctSteal',
			'Players.steal'
		);
	},
	'click #block': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctBlock',
			'Players.block'
		);
	},
	'click #provDefFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctProvDefFoul',
			'Players.provDefFoul'
		);
	},
	// Negative action
	'click #onePointOut': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctOnePointOut',
			'Players.onePointOut'
		);
	},
	'click #twoPointsOut': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctTwoPointsOut',
			'Players.twoPointsOut'
		);
	},
	'click #threePointsOut': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctThreePointsOut',
			'Players.threePointsOut'
		);
	},
	'click #turnover': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctTurnover',
			'Players.turnover'
		);
	},
	'click #offFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctOffFoul',
			'Players.offFoul'
		);
	},
	'click #defFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctDefFoul',
			'Players.defFoul'
		);
	},
	'click #foul1FT': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctFoul1FT',
			'Players.foul1FT'
		);
	},
	'click #foul2FT': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctFoul2FT',
			'Players.foul2FT'
		);
	},
	'click #foul3FT': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctFoul3FT',
			'Players.foul3FT'
		);
	},
	'click #techFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctTechFoul',
			'Players.techFoul'
		);
	},
	'click #antiSportFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctAntiSportFoul',
			'Players.antiSportFoul'
		);
	},
	'click #disqualifyingFoul': function() {
		return saveAction(
			$(R.prop('currentTarget', event)).hasClass('cancelAction'),
			getDataFromElement('#playerModal', 'playerid'),
			R.path(['data', 'gameData', 'yourClubTeamId'], Template.instance()),
			'Players.correctDisqualifyingFoul',
			'Players.disqualifyingFoul'
		);
	}
});
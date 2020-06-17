/**
 *
 * @see app/design/frontend/base/default/template/afterpay/form/payovertime_custom.phtml
 * @see app/design/frontend/base/default/template/afterpay/checkout/title_custom.phtml
 */
;(function (Prototype, Element) {

    if (! Prototype || ! Element) {
        return;
    }

    var Afterpay = window.Afterpay = window.Afterpay || {};
    Afterpay.CheckoutForm = Afterpay.CheckoutForm || {};

    var renderCheckoutTemplate = function (template, config) {

        var useCredit = Prototype.Selector.select(config.creditUsedSelector);
        if (useCredit.length != 0 && useCredit[0].checked) {
            template = template.gsub(config.orderAmountSubstitution, config.orderAmountCreditUsed)
                .gsub(config.installmentAmountSubstitution, config.installmentAmountCreditUsed)
                .gsub(config.installmentAmountSubstitutionLast, config.installmentAmountLastCreditUsed);
        } else {
            template = template.gsub(config.orderAmountSubstitution, config.orderAmount)
                .gsub(config.installmentAmountSubstitution, config.installmentAmount)
                .gsub(config.installmentAmountSubstitutionLast, config.installmentAmountLast);
        }

        return template.gsub(config.regionSpecificSubstitution, config.regionText)
            .gsub(config.imageCircleOneSubstitution, config.imageCircleOne)
            .gsub(config.imageCircleTwoSubstitution, config.imageCircleTwo)
            .gsub(config.imageCircleThreeSubstitution, config.imageCircleThree)
            .gsub(config.imageCircleFourSubstitution, config.imageCircleFour)
            .gsub(config.afterpayLogoSubstitution, config.afterpayLogo);
    };

    Afterpay.CheckoutForm.detailsConfiguration = null;

    Afterpay.CheckoutForm.detailsRender = function () {

        var configuration = this.detailsConfiguration;
        if (! configuration instanceof Object) {
            console.warn("Afterpay: checkout details configuration not initialized.");
            return;
        }
        try {
            var payOverTimeForms = Prototype.Selector.select(configuration.cssSelector);
            Element.update(payOverTimeForms[0], renderCheckoutTemplate(configuration.template, configuration));
        } catch (e) {
        }
    };

    Afterpay.CheckoutForm.titleConfiguration = null;

    Afterpay.CheckoutForm.titleRender = function () {

        var configuration = this.titleConfiguration;
        if (! configuration instanceof Object) {
            console.warn("Afterpay: checkout headline configuration not initialized.");
            return;
        }
        try {
            var payOverTimeForms = Prototype.Selector.select(configuration.cssSelector);
            Element.insert(payOverTimeForms[0], {
                before: renderCheckoutTemplate(configuration.template, configuration)
            });
        } catch (e) {
        }
    };

})(window.Prototype, window.Element);

/**
 * @author: Koshkin Alexey <koshkin.alexey@gmail.com>
 *
 * Makes button group from listbox
 *
 * Example usage:
 *      $('select.js-plainselect').plainselect();
 *      $('#selectID').plainselect();
 */
jQuery.fn.extend({

    plainselect: function() {
        return this.each(function () {
            var thisObject = $(this),
                tplButtonContainer = $('<div class="btn-group" role="group"></div>'),
                tplButtonItem = function (value, label) {
                    return $('<span class="btn btn-default btn-sm" name="'+value+'">'+label+'</span>')
                        .on('click', function() {
                            markButtonSelected($(this));
                            return $(this).parents('[role=group]').data('original-listbox').val( $(this).attr('name'));
                        });
                },
                markButtonSelected = function(btn) {
                    btn.parents('[role=group]').find('.btn-primary').toggleClass('btn-primary btn-default');
                    return btn.toggleClass('btn-primary btn-default');
                };

            thisObject.find('option').each(function(index, value) {
                var option = $(value),
                    btn = tplButtonItem(option.val(), option.text());

                if (option.prop('selected')) markButtonSelected(btn);
                tplButtonContainer.append(btn);
            });

            thisObject.on('change', function () {
                markButtonSelected($(this).data('group-list').find('[name='+$(this).val()+']'));
            });

            tplButtonContainer.data('original-listbox', thisObject);
            thisObject.hide().data('group-list', tplButtonContainer).after(tplButtonContainer);
        });
    }
});
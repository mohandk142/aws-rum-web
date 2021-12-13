import { context, getSession, record } from '../../../test-utils/test-utils';
import { CheckoutPlugin, CHECKOUT_EVENT_TYPE } from '../CheckoutPlugin';

describe('CheckoutPlugin tests', () => {
    beforeEach(() => {
        record.mockClear();
        getSession.mockClear();
    });

    test('when a user checks out then the plugin records the purchased items', async () => {
        // Init
        document.body.innerHTML =
            '<form id="checkout" action="javascript:void(0);"><input type="checkbox" id="sandwich" name="sandwich" value="sandwich"/><input id="submit" type="submit" value="Submit" /></form>';
        const plugin: CheckoutPlugin = new CheckoutPlugin();

        // Run
        plugin.load(context);
        document.getElementById('submit').click();
        plugin.disable();

        // Assert
        expect(record).toHaveBeenCalledTimes(1);
        expect(record.mock.calls[0][0]).toEqual(CHECKOUT_EVENT_TYPE);
        expect(record.mock.calls[0][1]).toMatchObject(
            expect.objectContaining({
                /* TODO */
            })
        );
    });
});

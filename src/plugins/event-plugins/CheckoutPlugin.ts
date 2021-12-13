import { RecordEvent, Plugin, PluginContext } from '../Plugin';

export const CHECKOUT_EVENT_TYPE = 'com.amazon.rum.checkout';
export const CHECKOUT_PLUGIN_ID = 'com.amazonaws.rum.checkout';

/**
 * A tutorial plugin.
 */
export class CheckoutPlugin implements Plugin {
    private enabled: boolean;
    private recordEvent: RecordEvent | undefined;

    load(context: PluginContext): void {
        this.recordEvent = context.record;
        this.enable();
    }

    enable(): void {
        if (this.enabled) {
            return;
        }
        this.addEventHandler();
        this.enabled = true;
    }

    disable(): void {
        if (!this.enabled) {
            return;
        }
        this.removeEventHandler();
        this.enabled = false;
    }

    getPluginId(): string {
        return CHECKOUT_PLUGIN_ID;
    }

    record(data: any): void {
        const demoEvent = {
            eventData: data
        };
        this.recordEvent(CHECKOUT_EVENT_TYPE, demoEvent);
    }

    private eventHandler = (event: Event) => {
        this.recordEvent(CHECKOUT_EVENT_TYPE, {
            /* TODO */
        });
    };

    private addEventHandler(): void {
        window.addEventListener('submit', this.eventHandler);
    }

    private removeEventHandler(): void {
        window.removeEventListener('submit', this.eventHandler);
    }
}

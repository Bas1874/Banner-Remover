/// <reference path="./plugin.d.ts" />

function init() {
    $ui.register((ctx) => {
        // This function will apply the correct styles based on saved settings.
        const applyStyles = async () => {
            const settings = $storage.get<{
                discovery: boolean;
                library: boolean;
                animeEntry: boolean;
                topbar: boolean;
            }>("bannerSettings") || {};

            const toggleElement = async (selector: string, shouldHide: boolean) => {
                try {
                    const elements = await ctx.dom.query(selector);
                    for (const el of elements) {
                        el.setStyle("display", shouldHide ? "none" : "");
                    }
                } catch (e) {
                    // Ignore errors if elements are not found
                }
            };
            
            await toggleElement(`[data-discover-page-header-banner-image-container="true"]`, !!settings.discovery);
            await toggleElement(`[data-library-header-container="true"]`, !!settings.library);
            await toggleElement(`[data-media-page-header-banner="true"]`, !!settings.animeEntry);
            await toggleElement(`[data-discover-page-header="true"]`, !!settings.discovery && !!settings.topbar);
        };

        // We use observers to make sure styles are applied whenever Seanime renders or re-renders these elements.
        ctx.dom.observe(`[data-discover-page-header-banner-image-container="true"]`, applyStyles);
        ctx.dom.observe(`[data-library-header-container="true"]`, applyStyles);
        ctx.dom.observe(`[data-media-page-header-banner="true"]`, applyStyles);
        ctx.screen.onNavigate(applyStyles);

        // Setup the tray UI.
        const tray = ctx.newTray({
            tooltipText: "Banner Settings",
            // This is the updated icon URL, pointing to the raw image file.
            iconUrl: "https://raw.githubusercontent.com/Bas1874/Banner-Remover/main/src/Icons/Icon.png",
            withContent: true,
        });

        const discoverySwitchRef = ctx.fieldRef<boolean>();
        const librarySwitchRef = ctx.fieldRef<boolean>();
        const animeEntrySwitchRef = ctx.fieldRef<boolean>();
        const topbarCheckboxRef = ctx.fieldRef<boolean>();
        
        const updateFormValues = () => {
            const settings = $storage.get("bannerSettings") || {};
            discoverySwitchRef.setValue(!!settings.discovery);
            librarySwitchRef.setValue(!!settings.library);
            animeEntrySwitchRef.setValue(!!settings.animeEntry);
            topbarCheckboxRef.setValue(!!settings.topbar);
        };

        tray.onOpen(updateFormValues);
        updateFormValues();

        tray.render(() => {
            const items = [
                tray.switch("Hide Discovery Page Banner", {
                    fieldRef: discoverySwitchRef,
                    onChange: ctx.eventHandler("rerender-tray-event", () => tray.update()),
                }),
                discoverySwitchRef.current ? tray.div([tray.checkbox("...and also hide the top bar", {
                    fieldRef: topbarCheckboxRef,
                })], { style: { paddingLeft: "24px" } }) : null,
                tray.switch("Hide Library Page Banner", { fieldRef: librarySwitchRef }),
                tray.switch("Hide Anime Entry Page Banner", { fieldRef: animeEntrySwitchRef }),
                tray.button({ label: "Save", onClick: "save-settings-event", intent: "primary" })
            ];
            return tray.stack({ items: items.filter(Boolean) });
        });

        // Setup the save handler.
        ctx.registerEventHandler("save-settings-event", () => {
            const isDiscoveryHidden = discoverySwitchRef.current;
            const finalSettings = {
                discovery: isDiscoveryHidden,
                library: librarySwitchRef.current,
                animeEntry: animeEntrySwitchRef.current,
                topbar: isDiscoveryHidden && topbarCheckboxRef.current,
            };
            $storage.set("bannerSettings", finalSettings);
            applyStyles(); // Immediately apply styles after saving.
            ctx.toast.success("Settings saved!");
        });
        
        // Use the context-specific setTimeout for the initial run.
        ctx.setTimeout(applyStyles, 500);
    });
}
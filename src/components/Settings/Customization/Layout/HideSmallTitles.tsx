import {
  Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import { useConfigContext } from '../../../../config/provider';
import { useConfigStore } from '../../../../config/store';
import { useColorTheme } from '../../../../tools/color';

export function HideSmallTitlesCheckbox() {
  const { t } = useTranslation('settings/customization/general');
  const { config, name: configName } = useConfigContext();
  const [titles, toggleTitles] = useDisclosure(config?.settings.customization.hideSmallTitles);
  const { primaryColor, setPrimaryShade } = useColorTheme();

  const updateConfig = useConfigStore((x) => x.updateConfig);

  if (!configName) {
    return null;
  }

  return (
    <Checkbox
      title={t('appereance.titleCheckbox.label')}
      description={t('appereance.titleCheckbox.description')}
      defaultChecked={titles}
      onChange={(e) => {
        toggleTitles.toggle();
        updateConfig(configName, (prev) => ({
          ...prev,
          settings: {
            ...prev.settings,
            customization: {
              ...prev.settings.customization,
              hideSmallTitles: e.target.checked,
            },
          },
        }));
      }}
    />
  );
}

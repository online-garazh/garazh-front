import { GeneralInfoForm } from '~/components/forms/general-info-form/general-info-form';
import { type CountryType } from '~/types/app.type';

interface GeneralTabProps {
  countries: CountryType[];
}

export function GeneralTab({ countries }: GeneralTabProps) {
  return <GeneralInfoForm onSubmit={() => null} countries={countries} />;
}

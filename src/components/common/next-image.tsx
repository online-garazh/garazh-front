import Image, { type ImageProps } from 'next/image';

type Props = {
  alt?: string;
} & ImageProps;

export function NextImage(props: Props) {
  const { alt = 'default-image-description', ...rest } = props;

  return <Image {...rest} alt={alt} />;
}

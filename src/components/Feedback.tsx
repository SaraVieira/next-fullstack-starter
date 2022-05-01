import { XCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

type Props = {
  message: string;
  variant: 'success' | 'warning' | 'error';
};

export const Feedback = ({ message, variant = 'success' }: Props) => {
  const isSuccess = variant === 'success';
  const isError = variant === 'error';
  const isWarning = variant === 'warning';
  return (
    <div
      className={classNames(
        'rounded-md  p-4 my-4',
        isError && 'bg-red-50',
        isSuccess && 'bg-green-50',
        isWarning && 'bg-yellow-50',
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {variant === 'error' && (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
          {variant === 'success' && (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
          {variant === 'warning' && (
            <ExclamationIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={classNames(
              'text-sm font-medium',
              isError && 'text-red-800',
              isSuccess && 'text-green-700',
              isWarning && 'text-yellow-700',
            )}
          >
            {message}
          </h3>
        </div>
      </div>
    </div>
  );
};

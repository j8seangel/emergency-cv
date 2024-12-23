import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/context/SessionProvider';
import { getAssignments } from '@/lib/actions';
import { SelectedHelpData } from '@/types/Requests';

type PhoneInfoProps = {
  caseInfo: SelectedHelpData;
  isAdmin: boolean;
};
export default function PhoneInfo({ caseInfo, isAdmin }: PhoneInfoProps) {
  const session = useSession();

  const {
    data: assignments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['help_request_assignments', { id: caseInfo.id }],
    queryFn: () => getAssignments(caseInfo.id),
  });

  if (error || isLoading) return <></>;

  const userAssignment = assignments?.find((x) => x.user_id === session.user?.id);

  return (
    <span className="break-words">
      <span className="font-semibold">Contacto:</span>{' '}
      {session && session.user
        ? isAdmin
          ? caseInfo.contact_info
          : !!userAssignment
            ? caseInfo.contact_info
            : 'Dale al botón "Quiero ayudar" para ver sus datos de contacto.'
        : 'Inicia sesion para ver este dato'}
    </span>
  );
}

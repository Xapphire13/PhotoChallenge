import { useParams } from "react-router";
import { gql, useMutation } from "urql";

const CREATE_INVITATION_MUTATION = gql`
  mutation CreateInvitation($groupId: String!) {
    createInvitation(groupId: $groupId) {
      id
    }
  }
`;

interface InvitationResponse {
  id: string;
}

interface CreateInvitationMutation {
  createInvitation: InvitationResponse;
}

export default function useCreateInvitation() {
  const { groupId } = useParams();
  const [, createInvitation] = useMutation<CreateInvitationMutation>(
    CREATE_INVITATION_MUTATION
  );

  const handleCreateInvitation = async () => {
    const result = await createInvitation({ groupId });

    if (!result.data) {
      throw new Error("Couldn't create invitation");
    }

    return result.data.createInvitation;
  };

  return handleCreateInvitation;
}

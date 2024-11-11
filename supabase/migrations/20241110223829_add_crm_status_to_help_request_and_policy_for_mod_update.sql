alter table "public"."help_requests" add column "crm_status" text;

create policy "Mod update"
on "public"."help_requests"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'moderator'::roles)))));




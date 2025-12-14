export const dynamic = 'force-dynamic';

import { chinguService } from '../../features/chingu/chingu.service';
import { ChinguType } from '../../features/chingu/chingu.type';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function ListPage() {
  const chingus: ChinguType[] = await chinguService.getAllChingus({
    limit: 50,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={chingus} />
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import React, { useEffect, useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {  Edit, Eye, MoreHorizontal } from "lucide-react";
import { PopoverContent } from "../ui/popover.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  useEffect(() => {
    const filtered =
      allAdminJobs?.length >= 0 &&
      allAdminJobs.filter((Jobs) => {
        if (!searchJobByText) return true;

        return (
          Jobs?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase()) ||
          Jobs?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filtered);
  }, [searchJobByText, allAdminJobs]);
  return (
    <div>
      <Table className="max-w-7xl mx-auto">
        <TableCaption className="border-t font-bold text-md">
          A list of your's recent registered Jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                You haven't registered any Jobs
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((Jobs) => (
              <TableRow key={Jobs._id} className="border-0 h-[4rem]">
                <TableCell>{Jobs?.company?.name}</TableCell>
                <TableCell>{Jobs?.title}</TableCell>
                <TableCell>{Jobs?.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer"></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit  border-none  bg-white">
                      <div className="flex gap-2 my-2 cursor-pointer">
                        <Edit></Edit>
                        <span>Edit</span>
                      </div>

                      <div
                        className="flex gap-2 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/jobs/${Jobs._id}/applicants`)
                        }
                      >
                        <Eye></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

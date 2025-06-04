import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
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
import { Edit, MoreHorizontal } from "lucide-react";
import { PopoverContent } from "../ui/popover.jsx";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hook/useGetAllCompanies.js";
import { useNavigate } from "react-router-dom";

export default function CompanyTable() {
  const navigate = useNavigate();
  useGetAllCompanies();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filtered =
      companies?.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;

        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filtered);
  }, [searchCompanyByText, companies]);
  return (
    <div>
      <Table className="max-w-7xl mx-auto">
        <TableCaption className='border-t font-bold text-md'>
          A list of your's recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                You haven't registered any company
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id} className="border-0 h-[4rem]">
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      className="h-[3rem] w-[3rem] "
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer"></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit pr-[3rem] border-none py-[1.2rem] bg-white">
                      <div
                        className="flex gap-3 bg-white  z-10 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <Edit></Edit>
                        <span>Edit</span>
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

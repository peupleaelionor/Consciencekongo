import { createFileRoute } from "@tanstack/react-router";
import { Boutique } from "@/components/boutique";

export const Route = createFileRoute("/")({ component: Boutique });

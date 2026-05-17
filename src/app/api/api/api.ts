export * from './adminController.service';
import { AdminControllerService } from './adminController.service';
export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './matchController.service';
import { MatchControllerService } from './matchController.service';
export * from './memberController.service';
import { MemberControllerService } from './memberController.service';
export const APIS = [AdminControllerService, AuthControllerService, MatchControllerService, MemberControllerService];
